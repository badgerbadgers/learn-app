import { test, expect } from "e2e/fixtures/testAsAdmin";
import { ObjectId } from "mongodb";

test.describe("/api/v1/staticpages", () => {
  //all tests
  // [x] There is no data to return
  // [x] There is data to return
  // [] There is data that is marked as is_shown=false
  // An error occurs when trying to retrieve the data

  test("returns an empty array when there are no staticpages", async ({
    request,
  }) => {
    const response = await request.get(`/api/v1/staticpages`);
    expect(response.ok()).toBeTruthy();
    expect((await response.json()).data).toHaveLength(0);
  });

  test("returns an array when there are staticpages", async ({
    request,
    db,
  }) => {
    const mockStaticPage = {
      wordpress_id: 2222,
      slug: "ctd-resource-2",
      title: "ctd-resource-2",
      isShown: true,
    };
    await db.resetData();
    let result = await db.collection("staticpages").insertOne(mockStaticPage);
    const staticPageId = result.insertedId;

    const mockStaticPages = [
      {
        wordpress_id: 1111,
        slug: "ctd-resource-1",
        title: "ctd-resource1",
        isShown: true,
      },
      {
        wordpress_id: 3333,
        slug: "ctd-resource-3",
        title: "ctd-resource3",
        isShown: true,
      },
      {
        wordpress_id: 4444,
        slug: "ctd-resource-4",
        title: "ctd-resource4",
        isShown: true,
      },
    ];
    await db.collection("staticpages").insertMany(mockStaticPages);
  });

  //returns array with isShown false
  // test("returns an array with a single object containing a boolean isShown equal to false", async ({
  //   request,
  //   db,
  // }) => {
  //   const mockFalseStaticPage = {
  //     wordpress_id: 1004,
  //     slug: "false-ctd-resource",
  //     title: "false-ctd-resource",
  //     isShown: false,
  //   };
  //   await db.collection("staticpages").insertOne(mockFalseStaticPage);
  //   //call GET and get all the static pages with isShown bool equal to true
  //   const response = await request.get(`/api/v1/staticpages`);
  //   console.log("response false isShown", response);
  //   expect(response.ok()).toBeTruthy();
  //   const staticpages = (await response.json()).data;
  //   expect(staticpages).toHaveLength(mockStaticPages.length);
  //   expect(staticpages).toContainEqual(
  //     expect.objectContaining({ isShow: true })
  //   );
  //   expect(staticpages).not.toContainEqual(
  //     expect.objectContaining({ isShown: false })
  //   );
  // });
  test.fixme("supports filters", async ({ request }) => {});

  test.fixme("handles errors", async ({ request }) => {});
});
