import { Link } from "react-router-dom";
export const LinkUrl = ({link_url, link_nome, link_class, link_style }) => {
    return (
        <Link to={link_url} className={link_class} style={link_style} >{link_nome}</Link>
    )
}