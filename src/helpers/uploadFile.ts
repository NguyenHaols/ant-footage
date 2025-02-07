import { storage } from '@/firebase';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const MB = 3;
const MAX_FILE_SIZE = MB * 1024 * 1024; // 3MB

export const uploadImageAndGetURL = async (
    file: File,
    showError?: boolean
): Promise<string | null> => {
    if (file.size > MAX_FILE_SIZE) {
        throw Error(`Kích thước ảnh tối đa là ${MB}MB`);
    }
    try {
        const date = dayjs().format('YYYYMMDDHHmmss');
        const storageRef = ref(storage, `images/${date}_${file.name}`);
        // Upload file lên Firebase Storage
        await uploadBytes(storageRef, file);
        // Lấy URL public của file
        const publicURL = await getDownloadURL(storageRef);
        return publicURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        if (showError) {
            throw error;
        }
        return null;
    }
};
