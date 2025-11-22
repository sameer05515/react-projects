const mockFindOne = jest.fn();
const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockSave = jest.fn();

jest.mock("./User.model", () => {
  function MockUser(data) {
    this.save = mockSave;
    this._id = data?._id || "user-id";
    this.username = data?.username;
    this.password = data?.password;
    this.name = data?.name;
    this.email = data?.email;
    this.mobileNumber = data?.mobileNumber;
    this.role = data?.role;
    return this;
  }
  MockUser.findOne = mockFindOne;
  MockUser.find = mockFind;
  MockUser.findById = mockFindById;
  return MockUser;
});

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed"),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("jwt-token"),
}));

const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  getUserById,
  updateUserById,
} = require("./User.service");

describe("User.service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore?.();
  });

  describe("registerUser", () => {
    it("creates user and returns message and token when username not taken", async () => {
      mockFindOne.mockResolvedValue(null);
      mockSave.mockResolvedValue(undefined);

      const result = await registerUser({
        username: "u1",
        password: "p1",
        name: "N",
        email: "e@e.com",
        mobileNumber: "123",
      });

      expect(mockFindOne).toHaveBeenCalledWith({ username: "u1" });
      expect(mockSave).toHaveBeenCalled();
      expect(result).toHaveProperty("message", "User registered successfully");
      expect(result).toHaveProperty("token", "jwt-token");
    });

    it("throws when username is already taken", async () => {
      mockFindOne.mockResolvedValue({ username: "u1" });

      await expect(
        registerUser({ username: "u1", password: "p", name: "", email: "" })
      ).rejects.toThrow("An error occurred while registering the user.");
    });

    it("throws generic error on save failure", async () => {
      mockFindOne.mockResolvedValue(null);
      mockSave.mockRejectedValue(new Error("DB error"));

      await expect(
        registerUser({ username: "u", password: "p", email: "e" })
      ).rejects.toThrow("An error occurred while registering the user.");
    });
  });

  describe("loginUser", () => {
    it("returns token when username and password match", async () => {
      const user = { _id: "id1", password: "hashed", name: "U1" };
      mockFindOne.mockResolvedValue(user);
      const bcrypt = require("bcrypt");
      bcrypt.compare.mockResolvedValue(true);

      const result = await loginUser("u1", "p1");

      expect(mockFindOne).toHaveBeenCalledWith({ username: "u1" });
      expect(result).toBe("jwt-token");
    });

    it("throws when user not found", async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(loginUser("missing", "p")).rejects.toThrow(
        "An error occurred during login"
      );
    });

    it("throws when password does not match", async () => {
      mockFindOne.mockResolvedValue({ _id: "id", password: "hash", name: "U" });
      const bcrypt = require("bcrypt");
      bcrypt.compare.mockResolvedValue(false);

      await expect(loginUser("u", "wrong")).rejects.toThrow(
        "An error occurred during login"
      );
    });
  });

  describe("getAllUsers", () => {
    it("returns users without password field", async () => {
      const users = [{ _id: "1", username: "u1" }];
      mockFind.mockResolvedValue(users);

      const result = await getAllUsers();

      expect(mockFind).toHaveBeenCalledWith({}, "-password");
      expect(result).toEqual(users);
    });

    it("throws Error fetching users when find fails", async () => {
      mockFind.mockRejectedValue(new Error("DB error"));

      await expect(getAllUsers()).rejects.toThrow("Error fetching users");
    });
  });

  describe("updateUserRole", () => {
    it("sets role to admin and saves", async () => {
      const user = { _id: "id", role: "user", save: jest.fn().mockResolvedValue({ role: "admin" }) };
      mockFindById.mockResolvedValue(user);

      const result = await updateUserRole("id");

      expect(mockFindById).toHaveBeenCalledWith("id");
      expect(user.role).toBe("admin");
      expect(user.save).toHaveBeenCalled();
    });

    it("throws when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(updateUserRole("missing")).rejects.toThrow(
        "Error updating user role"
      );
    });
  });

  describe("getUserById", () => {
    it("returns user when found", async () => {
      const user = { _id: "id", username: "u1" };
      mockFindById.mockResolvedValue(user);

      const result = await getUserById("id");

      expect(mockFindById).toHaveBeenCalledWith("id", "-password");
      expect(result).toEqual(user);
    });

    it("throws when not found", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(getUserById("missing")).rejects.toThrow(
        "An error occurred while fetching the user"
      );
    });
  });

  describe("updateUserById", () => {
    it("updates fields and saves", async () => {
      const user = {
        username: "old",
        name: "N",
        email: "e",
        mobileNumber: "m",
        save: jest.fn().mockResolvedValue({ username: "new" }),
      };
      mockFindById.mockResolvedValue(user);

      const result = await updateUserById("id", { username: "new" });

      expect(user.username).toBe("new");
      expect(user.save).toHaveBeenCalled();
    });

    it("throws when findById returns null", async () => {
      mockFindById.mockResolvedValue(null);

      await expect(updateUserById("missing", {})).rejects.toThrow(
        "An error occurred while updating the user"
      );
    });
  });
});
