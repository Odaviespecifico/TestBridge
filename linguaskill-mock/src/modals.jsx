export function ConcludedTestAlert({ref, handleConcludedModal}) {
    return(
        <dialog ref={ref} className="p-10 border-none outline-0 rounded-sm fixed top-6/12 left-6/12 -translate-1/2 backdrop:backdrop-blur-xs animate-opacityIn backdrop:animate-opacityIn">
            <div className="text-xl font-medium text-center">
            You have already finished this test. <br />
            How do you want to proceed?
            </div>
            <div className="flex w-full justify-evenly mt-10 gap-5">
                <button className="bg-green-300 p-3 px-4 text-xl font-bold rounded-3xl select-none hover:bg-green-400 hover:cursor-pointer transition-all active:shadow-inner active:bg-green-500" onClick={() => handleConcludedModal(('results'))}>See my results</button>
                <button className="bg-amber-300 p-3 px-4 text-xl font-bold rounded-3xl select-none hover:bg-amber-400 hover:cursor-pointer transition-all active:shadow-inner active:bg-amber-500" onClick={() => handleConcludedModal('New Test')}>Start a new test</button>
            </div>
        </dialog>
    )
}

export function FinishTestAlert({ref, handleFinishTest}) {
    return(
        <dialog ref={ref} closedby='none' className="p-5 border-none outline-0 rounded-sm fixed top-6/12 left-6/12 -translate-1/2 backdrop:backdrop-blur-xs animate-opacityIn backdrop:animate-opacityIn">
            <div className="text-2xl font-medium text-center">
            Are you sure you want to finish this test? <br />
            <p className="text-lg font-normal">After finishing you won't be able to change your answers</p>
            </div>
            <div className="flex w-full justify-evenly mt-5 gap-5">
                <button className="bg-amber-300 p-3 px-4 w-32 text-xl font-bold rounded-3xl select-none hover:bg-amber-400 hover:cursor-pointer transition-all active:shadow-inner active:bg-amber-500" onClick={() => handleFinishTest('no')}>Go back</button>
                <button className="bg-green-300 p-3 px-4 w-32 text-xl font-bold rounded-3xl select-none hover:bg-green-400 hover:cursor-pointer transition-all active:shadow-inner active:bg-green-500" onClick={() => handleFinishTest('yes')}>Finish test</button>
            </div>
        </dialog>
    )
}