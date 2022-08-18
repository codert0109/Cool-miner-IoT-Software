export default function ({ title, imgurl, price, comment }) {
    return (
        <div>
            <div>{title}</div>
            <div>
                <img src={imgurl} width="100%"></img>
            </div>
        </div>
    );
}