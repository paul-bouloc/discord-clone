import { BadRequestException } from '@constants/exceptions/bad-request.exception'
import { NotFoundException } from '@constants/exceptions/not-found.exception'
import { createServerDto, updateServerBannerDto } from '@dtos/server.dto'
import MemberService from '@services/member.service'
import ServerService from '@services/server.service'
import { NextFunction, Request, Response } from 'express'

/**
 * @description Get a server by id
 */
export const getServer = async (req: Request, res: Response, next: NextFunction) => {

  const serverId = req.params.id
  if(!serverId) throw new BadRequestException('Server id is required')

  const server = await ServerService.findById(serverId)
  if(!server) throw new NotFoundException('Server not found')

  res.status(200).json(server)
}

/**
 * @description Get all servers of the user
 */
export const getUserServers = async (req: Request, res: Response, next: NextFunction) => {
  const servers = await ServerService.findUserServers(req.user!.id)

  res.status(200).json(servers)
}

/**
 * @description Create a new server
 */
export const createServer = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as createServerDto

  const server = await ServerService.create(data, req.user!.id)

  res.status(201).json(server)
}

/**
 * @description Join a server
 */
export const joinServer = async (req: Request, res: Response, next: NextFunction) => {
  const serverId = req.params.id
  if(!serverId) throw new BadRequestException('Server id is required')

  const server = await ServerService.findById(serverId)
  if(!server) throw new NotFoundException('Server not found')

  const existingMember = await MemberService.findById(serverId, req.user!.id)
  if(existingMember) throw new BadRequestException('You are already a member of this server')

  const member = await MemberService.joinServer(serverId, req.user!.id)

  res.status(201).json(member)
}

/**
 * @description Update the name of the server
 */
export const updateServerName = async (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.body as createServerDto

  const serverId = req.params.id
  if(!serverId) throw new BadRequestException('Server id is required')

  const server = await ServerService.findById(req.params.id)
  if(!server) throw new NotFoundException('Server not found')

  await ServerService.updateName(serverId, name)

  const updatedServer = await ServerService.findById(serverId)

  res.status(200).json(updatedServer)  
}

/**
 * @description Update the banner of the server
 */
export const updateServerBanner = async (req: Request, res: Response, next: NextFunction) => {
  const {banner} = req.body as updateServerBannerDto

  const serverId = req.params.id
  if(!serverId) throw new BadRequestException('Server id is required')

  const server = await ServerService.findById(serverId)
  if(!server) throw new NotFoundException('Server not found')

  await ServerService.updateBanner(serverId, banner)

  const updatedServer = await ServerService.findById(serverId)

  res.status(200).json(updatedServer)
}

/**
 * @description Delete a server
 */
export const deleteServer = async (req: Request, res: Response, next: NextFunction) => {
  const serverId = req.params.id
  if(!serverId) throw new BadRequestException('Server id is required')

  const server = await ServerService.findById(serverId)
  if(!server) throw new NotFoundException('Server not found')

  await ServerService.delete(serverId)

  res.status(200).json({message: 'Server deleted'})
}
