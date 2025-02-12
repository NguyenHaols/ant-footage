import { getFileSize } from '@/lib/utils';
import { InboxIcon, Trash } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    borderRadius: 8,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderColor: 'rgb(142, 209, 252)',
    borderStyle: 'dashed',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

const activeStyle = {
    color: '#2196f3',
    borderColor: '#2196f3',
};

const acceptStyle = {
    color: '#00e676',
    borderColor: '#00e676',
};

const rejectStyle = {
    color: '#ff1744',
    borderColor: '#ff1744',
};

interface DragAndDropProps {
    getFile?: (file: File | undefined, type: any) => void;
    acceptFiles: any;
    name: any;
    uploadTitle: ReactNode;
    uploadProgress?: number;
    iconSrc?: string;
}

export const MyDropzone = ({
    getFile,
    acceptFiles,
    name,
    uploadTitle,
    // uploadProgress = 0,
}: DragAndDropProps) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles,
    } = useDropzone({
        accept: acceptFiles,
        maxFiles: 1,
        onDropAccepted: (acceptedFiles) => getFile?.(acceptedFiles[0], name),
    });

    const fileName = acceptedFiles?.[0]?.name;
    const fileSize = getFileSize(acceptedFiles?.[0]?.size);
    const style: any = useMemo(
        () => ({
            ...baseStyle,
            ...(isDragActive ? activeStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isDragActive, isDragAccept, isDragReject]
    );

    return (
        <>
            <div {...getRootProps({ style })} className="rounded border">
                <p className="ant-upload-drag-icon flex justify-center">
                    {uploadTitle}
                </p>
                <p className="ant-upload-drag-icon my-4 flex justify-center">
                    <InboxIcon />
                </p>
                <input {...getInputProps()} />
                <div className="ant-upload-text text-center">
                    drag and drop file here or click to upload
                </div>
            </div>
            {acceptedFiles?.length > 0 && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={
                        'mt-5 w-full rounded-lg bg-accent-foreground/10 px-4 py-2'
                    }
                >
                    <div className="relative flex">
                        {/*{iconSrc && (*/}
                        {/*    <Image*/}
                        {/*        className="mr-4 w-10"*/}
                        {/*        src={iconSrc}*/}
                        {/*        alt={name}*/}
                        {/*        width={40}*/}
                        {/*        height={50}*/}
                        {/*    />*/}
                        {/*)}*/}
                        <div className="flex-auto">
                            <p className="font-semibold text-sidebar-foreground">
                                {fileName}
                            </p>
                            <div
                                className={
                                    'flex items-center justify-between text-muted-foreground'
                                }
                            >
                                <span className="text-xs font-medium">
                                    {fileSize}
                                </span>
                                <button className="text-xs font-medium">
                                    <Trash />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="processBarParent">
                        <div className="processBar"></div>
                    </div>
                </div>
            )}
        </>
    );
};
