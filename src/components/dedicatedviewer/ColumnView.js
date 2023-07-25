/* eslint-disable react-hooks/exhaustive-deps */
import ViewerColumn from './ViewerColumn';

const ColumnViewer = ({events}) => {
    return (
      <div>
        <div className="mt-5 d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
          <div className="list-group">
                {events.map((column, index) => {
                    return (
                        <ViewerColumn key={index} _id={column._id} title={column.title} tagline={column.tagline} organizers={column.organizer} time={column.time}/>
                    );
                })}
          </div>
        </div>
      </div>
  );
};

export default ColumnViewer;
