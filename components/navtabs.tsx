import Link from "next/link";

export default function Navtabs({activePage, activeCategory, id} : {activePage: string, activeCategory: string, id: number}) {
    const category: string = activeCategory.toLowerCase() + 's';
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item" key="all">
                <Link className={`nav-link ${activePage == 'all' ? 'active' : ''}`} href={`/${category}`}>All {activeCategory}s</Link>
            </li>
            <li className="nav-item" key="add">
                <Link className={`nav-link ${activePage == 'add' ? 'active' : ''}`} href={`/${category}/add`}>Add a New {activeCategory}</Link>
            </li>
            <li className="nav-item" key="details">
                <Link className={`nav-link ${activePage == 'details' ? 'active' : ''} ${id == -1 ? 'disabled' : ''}`} href={`/${category}/${id}`}>Details</Link>
            </li>
            <li className="nav-item" key="edit">
                <Link className={`nav-link ${activePage == 'edit' ? 'active' : ''} ${id == -1 ? 'disabled' : ''}`} href={`/${category}/${id}/edit`}>Edit</Link>
            </li>
            <li className="nav-item" key="delete">
                <Link className={`nav-link ${activePage == 'delete' ? 'active' : ''} ${id == -1 ? 'disabled' : ''}`} href={`/${category}/${id}/delete`}>Delete</Link>
            </li>
        </ul>
    )
}