Parse.Cloud.define('hello', req => {
  req.log.info(req);
  return 'Hi';
});

Parse.Cloud.define('asyncFunction', async req => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  req.log.info(req);
  return 'Hi async';
});

Parse.Cloud.beforeSave('Test', () => {
  throw new Parse.Error(9001, 'Saving test objects is not available.');
});

Parse.Cloud.define("searchLandmarks", async (request) => {
  const { searchText } = request.params;

  // Create separate queries for each field
  const titleQuery = new Parse.Query("Landmark");
  titleQuery.matches("title", searchText, "i");

  const shortInfoQuery = new Parse.Query("Landmark");
  shortInfoQuery.matches("short_info", searchText, "i");

  // Combine queries
  const mainQuery = Parse.Query.or(titleQuery, shortInfoQuery);

  const results = await mainQuery.find();

  // Deduplicate results if necessary
  const uniqueResults = results.reduce((acc, current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Map results to JSON and sort by order field
  const sortedResults = uniqueResults.map(result => result.toJSON()).sort((a, b) => a.order - b.order);
  return sortedResults;
});

Parse.Cloud.define("saveLandmarkDetails", async (request) => {
  const { objectId, title, shortInfo, description } = request.params;

  const Landmark = Parse.Object.extend("Landmark");
  const query = new Parse.Query(Landmark);

  try {
    const landmark = await query.get(objectId);

    landmark.set("title", title);
    landmark.set("short_info", shortInfo);
    landmark.set("description", description);

    await landmark.save(null, { useMasterKey: true });
    return landmark.toJSON();
  } catch (error) {
    throw new Parse.Error(Parse.Error.SCRIPT_FAILED, `Failed to save landmark: ${error.message}`);
  }
});

