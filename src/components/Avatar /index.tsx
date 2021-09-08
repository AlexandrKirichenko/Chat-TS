import "./Avatar.module.scss";
import s from "./Avatar.module.scss";
import cn from "classnames";

interface AvatarProps {
    size ?: string;
    img: string;
    name: string;
    color ?: string;
}

const Avatar: React.FC<AvatarProps> = ({img, name, size="", color=""}) => {
    return(
        <div className={s.wrap}>
            {img && <img className={cn(s.avatar, s[size], s[color])} alt="avatar" src={img}/>}
            {img === "" && name !== "" && (
                <div className={cn(s.avatar_text, s[size], s[color])}>
                    {name.substring(0,2)}
                </div>
            )}
        </div>
    )
    
}

export default Avatar;