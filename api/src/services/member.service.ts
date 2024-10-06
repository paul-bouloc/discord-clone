import PrismaService from "@/services/prisma.service";
import { BadRequestException } from "@constants/exceptions/bad-request.exception";
import { ClientMember } from "@models/client-member.model";
import { MemberRole } from "@prisma/client";
import ServerService from "@services/server.service";
import UserService from "@services/user.service";

export default class MemberService {
	private static prisma = PrismaService.getInstance().getClient();

	static async joinServer(
		serverId: string,
		userId: string
	): Promise<ClientMember | null> {
		let member = await this.prisma.member.findFirst({
			where: { userId, serverId },
		});

		if (member && !member.active) {
			await this.prisma.member.update({
				where: { id: member.id },
				data: { active: true },
			});
		} else if (member && member.active) {
			throw new BadRequestException("You are already a member of this server");
		} else {
			member = await this.prisma.member.create({
				data: {
					userId,
					serverId,
				},
			});
		}

		const returnedMember = await this.findById(serverId, userId);

		return returnedMember;
	}

	static async leaveServer(memberId: string): Promise<void> {
		const member = await this.prisma.member.update({
			where: { id: memberId },
			data: { active: false },
		});
    
		if (member.role === MemberRole.ADMIN) {
			// Next part of the code will search if there's another ADMIN in the server
			const admins = await this.prisma.member.findMany({
				where: { serverId: member.serverId, role: MemberRole.ADMIN, NOT: {id: member.id} },
			});
			if (admins.length > 0) return;

			// If there's no ADMIN, the first MODERATOR will be promoted to ADMIN
			const moderators = await this.prisma.member.findMany({
				where: { serverId: member.serverId, role: MemberRole.MODERATOR },
			});
			if (moderators.length > 0) {
				const newAdmin = moderators[0];
				await this.prisma.member.update({
					where: { id: newAdmin.id },
					data: { role: MemberRole.ADMIN },
				});
				return;
			}

			// If there's no MODERATOR, the first MEMBER will be promoted to MODERATOR
			const members = await this.prisma.member.findMany({
				where: { serverId: member.serverId, role: MemberRole.USER },
			});
			if (members.length > 0) {
				const newModerator = members[0];
				await this.prisma.member.update({
					where: { id: newModerator.id },
					data: { role: MemberRole.MODERATOR },
				});
				return;
			}

			// If there's no MEMBER, the server will be deleted 
			await ServerService.delete(member.serverId);
		}

		return;
	}

	static async findById(
		serverId: string,
		userId: string,
		options: { includeInactives?: boolean } = { includeInactives: false }
	): Promise<ClientMember | null> {
		const member = await this.prisma.member.findFirst({
			where: {
				userId,
				serverId,
				...(options.includeInactives ? {} : { active: true }),
			},
		});

		if (!member) return null;

		const user = await UserService.findById(userId);

		if (!user) return null;

		const returnedMember = {
			...user,
			role: member.role,
			memberSince: member.createdAt,
			serverId: member.serverId,
			memberId: member.id,
		};

		return returnedMember;
	}

	static async findServerMembers(
		serverId: string,
		options: { includeInactives?: boolean } = { includeInactives: false }
	): Promise<ClientMember[]> {
		const members = await this.prisma.member.findMany({
			where: {
				serverId,
				...(options.includeInactives ? {} : { active: true }),
			},
		});

		const clientMembers = await Promise.all(
			members.map(async (member) => {
				const user = await this.findById(member.serverId, member.userId);

				if (!user) return null;

				return user;
			})
		);

		return clientMembers.filter((member) => member !== null) as ClientMember[];
	}
}
