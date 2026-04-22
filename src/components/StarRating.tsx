import React from 'react';

type StarRatingProps = {
    rate: number;
    size?: string;
};

const StarRating: React.FC<StarRatingProps> = ({ rate, size = '1rem' }) => (
    <span style={{ display: 'inline-flex', gap: 2 }}>
        {[1, 2, 3, 4, 5].map(star => {
            const filled = rate >= star;
            const half = !filled && rate >= star - 0.5;
            return (
                <span key={star} style={{ position: 'relative', display: 'inline-block', fontSize: size, lineHeight: 1 }}>
                    <span style={{ color: '#D1D5DB' }}>★</span>
                    {(filled || half) && (
                        <span style={{
                            position: 'absolute', left: 0, top: 0,
                            overflow: 'hidden',
                            width: filled ? '100%' : '50%',
                            color: '#F59E0B',
                        }}>★</span>
                    )}
                </span>
            );
        })}
    </span>
);

export default StarRating;
