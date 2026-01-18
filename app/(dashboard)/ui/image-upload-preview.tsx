import Image from "next/image";
import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";

type TImageUploadPreviewProps = {
    label?: string;
    value?: string;
    onChange: (file: File) => void;
    className?: string;
}

const ImageUploadPreview = ({ label, value, onChange, className }: TImageUploadPreviewProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onChange(file); 
        }
    };

    const handleImageClick = () => {
        fileInputRef?.current?.click();
    }

    return (
        <div className={className}>
            {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
            
            <div 
                onClick={handleImageClick}
                
                className="relative border-2 border-dashed border-primary bg-primary/5 rounded-lg h-52 w-full flex flex-col justify-center items-center cursor-pointer overflow-hidden"
            >
                {value ? (
                    
                    <Image 
                        src={value} 
                        alt="preview product" 
                        className="object-cover"
                        width={190}
                        height={190}
                    />
                ) : (
                    <>
                        <FiUploadCloud className="text-primary mb-2" size={32}/>
                        <span className="text-sm font-medium text-gray-500">Click to Upload</span>
                    </>
                )}
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
            </div>
        </div>
    )
}

export default ImageUploadPreview;