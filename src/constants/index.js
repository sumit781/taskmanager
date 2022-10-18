import React from "react"

export const MAX_WIDTH=970
export const FILTER_TYPE={
    user:"USER",
    status:"STATUS"
}
export const STATUS_OPTIONS = {
    inprogress:'in-progress',
    pending:'pending',
    done:'done',
    qa:'ready for QA',
    qaprogress:'QA in progress'
}

export const EMAIL_REGX=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const HOST='http://localhost:3001'
