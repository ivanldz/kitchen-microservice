import Order, { OrderStatus } from "../../../Domain/entities/Order";
import OrderService from "../../../Aplication/OrderService";
import { BaseController } from "./base.controller";
import { ErrorResponse, Locals } from "../types";
import { NextFunction, Request, Response } from "express";
import { OrderPage } from "../../../Domain/repositories/orderRepository";


export default class OrdersController extends BaseController {

    constructor(private orderService: OrderService) {
        super()
    }

    async createOrder(_req: Request, res: Response<Order | string, Locals<Order | ErrorResponse>>, next: NextFunction): Promise<void> {

        let status: number
        let data: Order | ErrorResponse

        try {
            data = await this.orderService.createOrder()
            status = 201
        } catch (err) {
            data = { error: this.getError(err) }
            status = 500
        }
        res.locals = { status, data }
        return next()
    }

    async prepareOrder(req: Request<any, any, { orderId: string | undefined }>, res: Response<Order | string, Locals<Order | ErrorResponse>>, next: NextFunction): Promise<void> {

        let status: number
        let data: Order | ErrorResponse
        const { orderId } = req.body

        try {
            if (!orderId) {
                throw new Error("orderId is required")
            }

            data = await this.orderService.prepareOrder(orderId)
            if (data.status === OrderStatus.WAITING) {
                status = 503
            } else {
                status = 201
            }
        } catch (err) {
            data = { error: this.getError(err) }
            status = 400
        }

        res.locals = { status, data }
        return next()
    }

    async finishOrder(req: Request<any, any, { orderId: string | undefined }, { status: string }>, res: Response<Order | string, Locals<Order | ErrorResponse>>, next: NextFunction): Promise<void> {

        let status: number
        let data: Order | ErrorResponse
        const { orderId } = req.body


        try {
            if (!orderId) {
                throw new Error("orderId is required")
            }

            data = await this.orderService.finishOrder(orderId)
            status = 201
        } catch (err) {
            data = { error: this.getError(err) }
            status = 400
        }

        res.locals = { status, data }
        return next()
    }

    async getOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { page } = req.params
        const query = req.query?.status as string

        let status: number
        let data: OrderPage | ErrorResponse

        try {
            if (!page) {
                throw new Error("page is required")
            }

            let filter: string[] | undefined
            if (query) {
                filter = query.split(",")
            }

            data = await this.orderService.getOrders(Number(page), filter)
            status = 200
        } catch (err) {
            data = { error: this.getError(err) }
            status = 400
        }

        res.locals = { status, data }
        return next()

    }
}