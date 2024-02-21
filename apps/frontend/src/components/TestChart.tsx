import * as React from "react";

const MyComponent: React.FC = () => {
    return (
        <>
            <div className="div">
                {/* ... (some parts omitted for brevity) */}
                <div className="div-7">
                    <img
                        loading="lazy"
                        srcSet="
              https://cdn.builder.io/api/v1/image/assets/TEMP/9e39fee3-555c-4cfa-b9b2-5e7f383e78ed?&width=100 100w,
              https://cdn.builder.io/api/v1/image/assets/TEMP/9e39fee3-555c-4cfa-b9b2-5e7f383e78ed?&width=200 200w,
              // ... (other widths)
            "
                        className="img"
                    />
                    <div className="div-8">
                        <img
                            loading="lazy"
                            srcSet="
                https://cdn.builder.io/api/v1/image/assets/TEMP/f313bfcf-1596-466d-9ed9-8d282561cf90?&width=100 100w,
                https://cdn.builder.io/api/v1/image/assets/TEMP/f313bfcf-1596-466d-9ed9-8d282561cf90?&width=200 200w,
                // ... (other widths)
              "
                            className="img-2"
                        />
                        <img
                            loading="lazy"
                            srcSet="
                https://cdn.builder.io/api/v1/image/assets/TEMP/e337c620-d279-42ef-940b-05cf8265dcc6?&width=100 100w,
                https://cdn.builder.io/api/v1/image/assets/TEMP/e337c620-d279-42ef-940b-05cf8265dcc6?&width=200 200w,
                // ... (other widths)
              "
                            className="img-3"
                        />
                        {/* ... (similar for other img elements) */}
                    </div>
                </div>
                {/* ... (some parts omitted for brevity) */}
            </div>
            <style jsx>{`
        .div {
          width: 100%;
          max-width: 583px;
          display: flex;
          flex-direction: column;
        }
        // ... (other CSS rules)
      `}</style>
        </>
    );
};

export default MyComponent;
