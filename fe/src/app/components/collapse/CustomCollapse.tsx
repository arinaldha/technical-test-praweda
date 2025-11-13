'use client'

import React from "react"

interface CollapseProps {
    collapseHeader : React.ReactNode,
    collapseBody : React.ReactNode
}

export default function CustomCollapse(props : CollapseProps) {
    return(
        <div className="collapse-wrapper">
            <div className="collapse-header">{props.collapseHeader}</div>
            <div className="collapse-body">{props.collapseBody}</div>
        </div>
    )
}