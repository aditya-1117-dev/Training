
export default function ListCategories({categoryData}) {

    return (
        <>
            <option value="all">Select Categories</option>
            {categoryData && categoryData.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </>
    )
}