import {Fragment} from "react";
import {PromotionList} from "../components/PromotionList.tsx";
import {SliderCategories} from "../components/SliderCategories.tsx";

const Promotions = () => {
    return (
        <Fragment>
            <section className="mt-8">
                <PromotionList />
            </section>
            <section className="mt-8">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mb-8">
                                <h3 className="mb-0">Comprar por Categoría</h3>
                            </div>
                        </div>
                    </div>
                    <SliderCategories/>
                </div>
            </section>
        </Fragment>
    )
};
export default Promotions;