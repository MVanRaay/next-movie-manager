export default function RangeSlider() {
    'use client';
    let rating: number = 5;

    const setRating = (_rating: string) => {
        rating = parseInt(_rating);
        //this.setState({rating: rating});
    }

    return (
        <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <input className="form-control" type="range" name="rating" min={0} max={10} step={1} defaultValue={5} onChange={(event) => setRating(event.target.value)} />
            <label htmlFor="rating">{rating}/10</label>
        </div>
    )
}
