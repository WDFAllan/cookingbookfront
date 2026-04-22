import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { getCroppedImg } from '../../utils/cropImage';

type Props = {
    imageSrc: string;
    onCancel: () => void;
    onConfirm: (croppedBlob: Blob) => void;
};

const ImageCropModal: React.FC<Props> = ({ imageSrc, onCancel, onConfirm }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleConfirm = async () => {
        if (!croppedAreaPixels) return;
        const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
        onConfirm(blob);
    };

    return (
        <Dialog open fullWidth maxWidth="sm">
            <DialogTitle>Recadrer la photo</DialogTitle>
            <DialogContent>
                <div style={{ position: 'relative', width: '100%', height: 320, background: '#111' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={16 / 9}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>
                <div style={{ padding: '1rem 0.5rem 0' }}>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.85rem', color: '#6B7280' }}>Zoom</p>
                    <Slider
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.05}
                        onChange={(_, value) => setZoom(value as number)}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="inherit">Annuler</Button>
                <Button onClick={handleConfirm} variant="contained" color="primary">
                    Confirmer
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageCropModal;
