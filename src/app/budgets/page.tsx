import Header from "@/components/header/header";

const BudgetsPage = () => {
    return (
        <div className="container py-20 px-10">
            <Header title="Budgets" />
            <div className="container w-full mx-auto">
                <div className="card w-96 border-2 mb-5">
                    <div className="card-body">
                        <h2 className="card-title"> Your budget this month </h2>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2"> Income </h2>
                    <div className="">
                        <div className="flex justify-between">
                            <p className="mr-5"> Income 1 </p>
                            <p> $ 1,821 left </p>
                        </div>
                        <progress className="progress progress-success w-full" value={50} max="100"></progress>
                        <div className="flex justify-between">
                            <p className="mr-5"> 2,049$ of $3,870 </p>
                            <p> Edit </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2"> Spending </h2>
                    <div className="">
                        <div className="flex justify-between">
                            <p className="mr-5"> Income 1 </p>
                            <p> $ 1,821 left </p>
                        </div>
                        <progress className="progress progress-warning w-full" value={50} max="100"></progress>
                        <div className="flex justify-between">
                            <p className="mr-5"> 2,049$ of $3,870 </p>
                            <p> Edit </p>
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
            </div>
        </div>
    );
}

export default BudgetsPage;
export { BudgetsPage };