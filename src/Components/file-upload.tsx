import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadProps } from 'antd';

export interface FileUploadProps extends UploadProps {
    value?: any;
}

const FileUpload = ({
    value,
    maxCount = 1,
    listType = 'picture',
    ...props
}: FileUploadProps) => {
    // const { messages } = useTranslate();
    const fileList = value?.fileList || [];

    // Prevent upload action
    function beforeUpload() {
        return false;
    }

    return (
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
    );
};

export default FileUpload;
