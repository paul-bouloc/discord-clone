import { BadRequestException } from "@constants/exceptions/bad-request.exception";
import { createServerDto } from "@dtos/server.dto";
import { ClientServer } from "@models/client-server.model";
import { MemberRole } from "@prisma/client";
import PrismaService from "@services/prisma.service";
import { base64ToBinary } from "@utils/base64-manipulation.util";

export default class ServerService {
	private static prisma = PrismaService.getInstance().getClient();

	static async create(name: string, userId: string): Promise<ClientServer> {
		const server = await this.prisma.server.create({
			data: {
				name,
				members: {
					create: {
						userId,
						role: MemberRole.ADMIN,
					},
				},
			},
		});

		const { banner_data, banner_type, ...serverWithoutBanner } = server;

		return serverWithoutBanner;
	}

	static async findById(id: string): Promise<ClientServer | null> {
		const server = await this.prisma.server.findFirst({
			where: { id },
		});

		if (!server) return null;

		const { banner_data, banner_type, ...serverWithoutBanner } = server;

		return serverWithoutBanner;
	}

	static async findUserServers(
		userId: string,
		options: { includeInactives?: boolean } = { includeInactives: false }
	): Promise<ClientServer[]> {
		const servers = await this.prisma.server.findMany({
			where: {
				members: {
					some: {
						userId,
						...(options.includeInactives ? {} : { active: true }),
					},
				},
			},
		});

		const clientServers = servers.map((server) => {
			const { banner_data, banner_type, ...serverWithoutBanner } = server;

			return serverWithoutBanner;
		});

		return clientServers;
	}

	static async updateName(
		id: string,
		name: string
	): Promise<ClientServer | null> {
		const server = await this.prisma.server.update({
			where: { id },
			data: { name },
		});

		return server;
	}

	static async updateBanner(
		id: string,
		banner: string
	): Promise<ClientServer | null> {
		try {
			const { type, binary } = base64ToBinary(banner);

			const server = await this.prisma.server.update({
				where: { id },
				data: { banner_data: binary, banner_type: type },
			});

			return server;
		} catch (error) {
			throw new BadRequestException("Invalid banner format");
		}
	}

	static async delete(id: string): Promise<void> {
		await this.prisma.message.deleteMany({
			where: {
				channel: {
					serverId: id,
				},
			},
		});

		await this.prisma.channel.deleteMany({
			where: {
				serverId: id,
			},
		});

		await this.prisma.member.deleteMany({
			where: {
				serverId: id,
			},
		});

		await this.prisma.server.delete({
			where: { id },
		});

		return;
	}
}
