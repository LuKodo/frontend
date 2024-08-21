import { Card } from "react-bootstrap"

interface CategoryProps {
    category: string
    setCategory: Function
}

export const CategoryCard = (props: CategoryProps) => {
    return (
        <Card class="overflow-hidden" onClick={() => props.setCategory(props.category)} style={{ cursor: 'pointer', height: '100px'}}>
            <div class="el-card-item pb-3">
                <div class="
                      el-card-avatar
                      mb-3
                      el-overlay-1
                      w-100
                      overflow-hidden
                      position-relative
                      text-center
                    ">
                    <img src="../assets/images/blog/blog-img1.jpg" class="d-block position-relative w-100" alt={`${props.category}`} />
                </div>
                <div class="el-card-content text-center">
                    <p class="mb-0 small">{props.category}</p>
                </div>
            </div>
        </Card>
    )
}