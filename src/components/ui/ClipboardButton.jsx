import CopyIcon from '@/components/ui/icons/CopyIcon.jsx'
import CheckIcon from '@/components/ui/icons/CheckIcon.jsx'
import { useState } from 'react';
import { Tooltip } from './Tooltip';
import content from '@/data/content.json';

export function ClipboardButton(props){
    const {text} = props;
    const [userClicked, setUserClicked] = useState(false);
    const [tooltipText, setTooltipText] = useState(content.glossary.copy_to_clipboard)

    const handleClick = () => {
        navigator.clipboard.writeText(text)
        setUserClicked(true)
        setTooltipText(content.glossary.copied)
        

        setTimeout(() => {setUserClicked(false); setTooltipText(content.glossary.copy_to_clipboard);}, 4000)
    }
    
    return (
        <Tooltip text={tooltipText}>
            <div {...props}>
                {!userClicked ? <CopyIcon onClick={handleClick} className="fill-base cursor-pointer" /> : <CheckIcon className="fill-base"/>}

            </div>
        </Tooltip>
    )
}