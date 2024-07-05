import PagesHeader from '../components/PagesHeader';
import ReccomendationsListing from '../modules/reccomendations';

const ReccomendationsPage = () => {
    return (
        <div>
          <div>
            <div>
              <PagesHeader
                name="Reccomended Places"
                btnName=""
                btnAction={() => false}
              />
            </div>
            <div className="mt-4">
              <ReccomendationsListing/>
            </div>
          </div>
        </div>
      );
}

export default ReccomendationsPage