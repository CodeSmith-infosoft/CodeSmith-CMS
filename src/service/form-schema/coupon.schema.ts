import { z } from "zod";

const numberRegex = /^\d+(\.\d+)?$/; 

const couponSchema = z.object({
  code: z.string().min(1, "Code is required"),
  description: z.string().min(1, "Description is required"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z
    .string()
    .regex(numberRegex, "Discount value must be a number")
    .refine((val) => parseFloat(val) > 0, {
      message: "Discount value must be positive",
    }),

  minPurchase: z
    .string()
    .regex(numberRegex, "Minimum purchase must be a number")
    .refine((val) => parseFloat(val) >= 0, {
      message: "Minimum purchase must be 0 or more",
    }),
  validFrom: z.string().min(1, "Start date is required"),
  validTo: z.string().min(1, "End date is required"),
});

export type couponFormdataType = z.infer<typeof couponSchema>;

export default couponSchema;
