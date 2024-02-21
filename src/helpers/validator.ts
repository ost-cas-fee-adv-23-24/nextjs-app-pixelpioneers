import { CreatePostSchema, PostValidationResult } from '@/src/models/post.model';
import { AvatarValidationResult, UpdateAvatarSchema } from '@/src/models/user.model';

export function validatePostData(formData: FormData): PostValidationResult | void {
    const validatedFields = CreatePostSchema.safeParse({
        text: formData.get('text'),
        media: formData.get('media'),
    });
    if (!validatedFields.success) {
        return validatedFields.error.flatten().fieldErrors;
    }
    return;
}

export function validateAvatarData(formData: FormData): AvatarValidationResult | void {
    const validatedFields = UpdateAvatarSchema.safeParse({
        media: formData.get('media'),
    });
    if (!validatedFields.success) {
        return validatedFields.error.flatten().fieldErrors;
    }
    return;
}
