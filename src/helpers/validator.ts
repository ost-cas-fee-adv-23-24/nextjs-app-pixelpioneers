import { CreatePostSchema, PostValidationResult } from '@/src/models/post.model';

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
