import React from "react";

function Register() {
  return (
    <div>
      <form>
        {!isOpen && (
          <div className="flex flex-col space-y-2">
            <TextField
              id="outlined-basic-displayname"
              value={displayname}
              onChange={(e) => setDisplayname(e.target.value)}
              label="Displayname"
              variant="outlined"
            />
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-basic-username"
              label="Username"
              variant="outlined"
            />
            <TextField
              id="outlined-basic-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              variant="outlined"
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
        )}
        <div className="grid grid-cols-3 space-x-4">
          <div>
            <h1 className="font-bold text-xl">Month</h1>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              min={1}
              max={12}
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">Day</h1>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              min={1}
              max={31}
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">Year</h1>
            <Slider
              size="small"
              aria-label="Small"
              valueLabelDisplay="auto"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              min={1950}
              max={2022}
            />
          </div>
        </div>

        <button
          type="submit"
          className={
            !isLoading
              ? `auth-btn bg-black hover:bg-zinc-800 text-white font-bold`
              : `auth-btn bg-black hover:bg-zinc-800 text-white font-bold cursor-not-allowed`
          }
          onClick={(e) => {
            if (!isLoading) {
              handleOnClick(e);
            } else {
              e.preventDefault();
            }
          }}
        >
          {isLoading ? <Loader forPage={false} /> : <h1>Register</h1>}
        </button>
      </form>
      <div className="w-[70%] mx-9 mt-[5rem]">
        <h1 className="font-bold text-2xl">Already have an account?</h1>
        <button className="auth-btn text-blue-500 mt-3" to="/login">
          Sign in
        </button>
      </div>
      {error && (
        <h1 className="absolute bottom-0 p-2 w-full text-white font-bold bg-blue-500 text-center lg:w-max lg:px-5 lg:bottom-5 lg:inset-x-0 lg:mx-auto lg:rounded-lg lg:ring-2 lg:ring-blue-600">
          {error}!
        </h1>
      )}

      {isOpen && <Verification />}
    </div>
  );
}

export default Register;
