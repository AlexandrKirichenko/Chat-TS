import './Avatar.module.scss';
import style from './Avatar.module.scss';
import classnames from 'classnames';

interface AvatarProps {
    size: string;
    img: string;
    name: string;
}

const Avatar: React.FC<AvatarProps> = ({img, name, size=""}) => {
    return(
        <div className={style.wrap}>
            {img && <img className={classnames(style.avatar, style[size])} alt="avatar" src={img}/>}
            {img === "" && name !== "" && (
                <div className={classnames(style.avatar, style.text, style[size])}>
                    {name.substring(0,2)}
                </div>
            )}
        </div>
    )
}

export default Avatar;