import { CreatePostSchema, PostValidationResult } from '@/src/models/message.model';
import { AvatarValidationResult, UpdateAvatarSchema } from '@/src/models/user.model';

export function validatePostData(formData: FormData): PostValidationResult | void {
    const validatedFields = CreatePostSchema.safeParse({
        text: formData.get('text'),
        media: formData.get('media'),
    });
    if (!validatedFields.success) {
        throw new Error('validation failed');
    }
    return;
}

export function validateAvatarData(formData: FormData): AvatarValidationResult | void {
    const validatedFields = UpdateAvatarSchema.safeParse({
        media: formData.get('media'),
    });
    if (!validatedFields.success) {
        throw new Error('validation failed');
    }
    return;
}
