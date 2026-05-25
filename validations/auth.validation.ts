import { assertObject, readString } from "@/validations/common";

export function validateLoginPayload(payload: unknown) {
  const object = assertObject(payload);

  return {
    email: readString(object, "email", { required: true }).toLowerCase(),
    password: readString(object, "password", { required: true }),
  };
}
