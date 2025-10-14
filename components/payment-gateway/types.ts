import type { DriveTestOrder } from "@/lib/drive-test";

export type PaymentGatewayId = "creditCard" | "klarna" | "paypal";

export interface PaymentGatewayProps {
  order: DriveTestOrder;
}
