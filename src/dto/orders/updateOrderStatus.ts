import { z } from 'zod';
import { validateAndCreate } from '../../common/payload';
import { defaultToApiPayload } from '../helpers';
export const updateOrderStatusSchema = z.object({ order_number: z.string().min(1), order_status: z.string().min(1) });
export type UpdateOrderStatus = z.infer<typeof updateOrderStatusSchema>;
export const parseUpdateOrderStatus = (d: unknown) => validateAndCreate(updateOrderStatusSchema, d);
export const updateOrderStatusToApiPayload = (dto: UpdateOrderStatus) => defaultToApiPayload(dto);
