import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Divider,
} from "@mui/material";

const CoHostSection = () => {
  return (
    <Box textAlign="center" mt={8}>
      {/* Title */}
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        A co-host can do <br />
        the hosting for you
      </Typography>

      {/* Description */}
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ fontSize: "1.5rem" }}
      >
        Now you can hire a high-quality, local co‑host
        <br />
        to take care of your home and guests.
      </Typography>

      {/* Cards Section */}
      <Box
        mt={4}
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        sx={{
          width: "100%",
          padding: "20px",
          backgroundColor: "rgb(247, 247, 247)",
        }}
      >
        {/* Card 1 */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            width: "18%",
            padding: "20px",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <Avatar
              alt="John Doe"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-HLPO29_Fast%20Follow%20Passport%20Pictures%20-%20NORAM/original/e4f7bb88-643f-49cf-9dea-6cf87b7f3174.jpeg"
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </Box>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" align="center">
              Jorge
            </Typography>
            <Typography variant="body1" color="black" align="center">
              Co-host in Mexico City, Mexico
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  ★ 4.5
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Guest Rating
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px" }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  5
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Years Hosting
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            width: "18%",
            padding: "15px",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <Avatar
              alt="Gabrielle"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/332516e2-c531-4a35-a9e4-012f1477014a.jpeg"
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </Box>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" align="center">
              Gabrielle
            </Typography>
            <Typography
              variant="body1"
              color="black
            "
              align="center"
            >
              Co-host in North Charleston, USA
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="black
                "
                  display="block"
                  alignItems="center"
                >
                  ★ 4.7
                </Typography>
                <Typography
                  variant="body2"
                  color="black
                "
                  align="center"
                >
                  Guest Rating
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px" }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="black
                "
                  display="block"
                  alignItems="center"
                >
                  3
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Years Hosting
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            width: "18%",
            padding: "20px",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <Avatar
              alt="Mariam"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-016HLP_MVP%20Images-Test%20Delivery%2010_2_2024/original/3a45f32f-0cdc-403b-823a-884f2b3941b1.jpeg"
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </Box>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" align="center">
              Mariam
            </Typography>
            <Typography variant="body1" color="black" align="center">
              Co-host in Los Angeles, USA
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  ★ 4.8
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Guest Rating
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px" }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  7
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Years Hosting
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            width: "18%",
            padding: "20px",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <Avatar
              alt="Victor"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-HLPO29_Fast%20Follow%20Passport%20Pictures%20-%20NORAM/original/c5a18221-ba27-43ac-8e8d-cb5f7c8e7cca.jpeg"
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </Box>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" align="center">
              Victor
            </Typography>
            <Typography variant="body1" color="black" align="center">
              Co-host in Dartmouth, Canada
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  ★ 5.0
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Guest Rating
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px" }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  10
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Years Hosting
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Card 5 */}
        <Card
          sx={{
            maxWidth: 345,
            boxShadow: 3,
            borderRadius: "16px",
            backgroundColor: "white",
            width: "18%",
            padding: "20px",
          }}
        >
          <Box display="flex" justifyContent="center" p={2}>
            <Avatar
              alt="Elizabeth"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-HLPO29_Fast%20Follow%20Passport%20Pictures%20-%20NORAM/original/b5ab3e34-c77c-426e-82fa-7401162b3ae0.jpeg"
              sx={{ width: 150, height: 150, borderRadius: "50%" }}
            />
          </Box>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" align="center">
              Elizabeth
            </Typography>
            <Typography variant="body1" color="black" align="center">
              Co-host in Temple, USA
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  ★ 4.9
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Guest Rating
                </Typography>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: "30px" }}
              />
              <Box>
                <Typography
                  variant="body2"
                  color="black"
                  display="block"
                  alignItems="center"
                >
                  8
                </Typography>
                <Typography variant="body2" color="black" align="center">
                  Years Hosting
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CoHostSection;
