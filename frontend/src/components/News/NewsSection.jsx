import React from 'react';
import NewsCard from './NewsCard';

export default function NewsSection() {
    return (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </div>
    );
}
