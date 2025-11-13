'use client'

import React, { ReactNode } from 'react'
import './table.scss'

export interface TableProps {
    tableHeader: ReactNode,
    tableBody: ReactNode,
}

export default function CustomTable(props: TableProps) {
    return (
        <div className="table-wrapper">
            <div className="table-header">
                {props.tableHeader}
            </div>
            <div className="table-body">
                {props.tableBody}
            </div>
        </div>
    )
}
