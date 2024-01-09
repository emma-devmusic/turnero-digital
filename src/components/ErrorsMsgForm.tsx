
type MsgErrors = { text: string }

export const ErrorsMsgForm = ({text}:MsgErrors) => {
    return (
        <div className="" style={{color: 'red', fontSize: '.9rem'}}>
            {text}
        </div>
    )
}
