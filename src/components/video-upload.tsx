import { showNotification } from '@/helpers/messagesHelper';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';
export interface FileUploadProps extends UploadProps {
    value?: any;
}

const VideoUpload = ({
    value,
    maxCount = 1,
    listType = 'picture',
    ...props
}: FileUploadProps) => {
    // const { messages } = useTranslate();
    const fileList = value?.fileList || [];

    // Prevent upload action
    function beforeUpload(file: File) {
        const isVideo = file.type.startsWith('video/');
        console.log('🚀 ~ beforeUpload ~ isVideo:', isVideo);
        if (!isVideo) {
            showNotification('error', 'Please select a video file');
            return Upload.LIST_IGNORE;
        }
        return false;
    }

    return (
        <div>
            <Upload
                showUploadList={{
                    showRemoveIcon: true,
                    showDownloadIcon: true,
                }}
                {...props}
                fileList={fileList}
                beforeUpload={beforeUpload}
                listType={listType}
            >
                {(fileList.length < maxCount && (
                    <Button
                        style={{ padding: '4px 16px', height: '36px' }}
                        icon={<UploadOutlined />}
                    >
                        {/* {messages('common.upload')} */}
                        Upload
                    </Button>
                )) ||
                    null}
            </Upload>
        </div>
    );
};

export default VideoUpload;
