import * as bcrypt from 'bcrypt';

export async function generateHash(password: string) {
    return bcrypt.hash(password, 10);
}

export async function validateHash(password: string, hash: string) {
    return bcrypt.compare(password, hash);
}

export function convertFromMongooseToPlainObject(object: any) {
    return { ...object.toObject(), _id: object.id };
}
