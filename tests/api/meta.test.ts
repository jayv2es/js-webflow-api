import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { MetaFixture } from "../fixtures";
import { Meta } from "../../src/api";

describe("Meta", () => {
  const mock = new MockAdapter(axios);
  const client = axios.create();

  it("should get info", async () => {
    const { response } = MetaFixture.info;
    const path = `/info`;

    mock.onGet(path).reply(200, response);
    const { data } = await Meta.info(client);

    expect(data).toBeDefined();
    expect(data.users).toEqual(response.users);
    expect(data.sites).toEqual(response.sites);
    expect(data.workspaces).toEqual(response.workspaces);
    expect(data.application).toEqual(response.application);
  });

  it("should get info about the user", async () => {
    const { response } = MetaFixture.installer;

    const path = `/user`;
    mock.onGet(path).reply(200, response);
    const { data } = await Meta.user(client);

    expect(data).toBeDefined();
    expect(data.user).toBeDefined();
    expect(data.user._id).toEqual(response.user._id);
    expect(data.user.email).toEqual(response.user.email);
    expect(data.user.firstName).toEqual(response.user.firstName);
    expect(data.user.lastName).toEqual(response.user.lastName);
  });
});
