
export default function ListCategories({categoryData}) {

    return (
        <>
            <option value="all">Select Categories</option>
            {categoryData.data && categoryData.data.map((category, index) => (
                <option key={index} value={category}>{category}</option>
            ))}
        </>
    )
}