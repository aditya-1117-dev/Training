
export default function ListCategories({categories}) {

    return (
        <>
            <option value="all">Select Categories</option>
            {categories && categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </>
    )
}