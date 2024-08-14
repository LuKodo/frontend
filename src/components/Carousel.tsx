import { Carousel } from "react-bootstrap"

export const CarouselComponent = () => {

    return (
        <Carousel>
            <Carousel.Item>
                <img className="d-block w-100" src="/banner.png" alt="First slide" />
            </Carousel.Item>
        </Carousel>
    )
}