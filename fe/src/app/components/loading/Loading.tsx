import React from 'react'
import color from '@/assets/sass/modules/colors.module.scss';
import { Image } from 'antd';

export default function Loading() {
    return (
        <div className='loading'>
            <span>Loading</span>
            <Image src="/images/loadings/rolling.svg" alt="image" width={20} preview={false} />
        </div>
    )
}
