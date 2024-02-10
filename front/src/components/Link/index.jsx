import { Link } from "react-router-dom";
export const Link = ({link_url, link_nome }) => {
    return (
        <Link to={link_url}>{link_nome}</Link>
    )
}