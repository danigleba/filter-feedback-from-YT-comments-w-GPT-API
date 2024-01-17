export default function LoomVideo() {    
    return (
        <div className="w-full aspect-video">
            <div style={{position: "relative", paddingBottom: "62.5%", height: 0}}>
                <iframe
                    src="https://www.loom.com/embed/ada223d3fdc943d68596c42e1431e5b5"
                    allowFullScreen
                    style={{position: "absolute", borderRadius: "12px", top: 0, left: 0, width: "100%", height: "100%"}}
                    title="Loom Video" />
            </div>
        </div>
    )
}
  