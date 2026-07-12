"use client";

import Modal from "./Modal";

export default function ImagePreviewModal({

    open,

    image,

    title,

    onClose,

}) {

    return (

        <Modal
            open={open}
            onClose={onClose}
            title={title}
        >

            <div className="flex justify-center">

                <img
                    src={image}
                    alt={title}
                    className="max-h-[70vh] rounded-xl"
                />

            </div>

        </Modal>

    );

}