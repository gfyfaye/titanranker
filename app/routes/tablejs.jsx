
const Table = ({ rankedTitans }) => {
  return (
    <div className="table">
      {Object.keys(rankedTitans).map((rank) => (
        <div className="row" key={rank}>
          <div className="cell rank">{rank}</div>
          {rankedTitans[rank].map((titan) => (
            <div className="cell" key={titan.id}>
              <img src={titan.image} style={{ width: "150px", height: "150px", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
