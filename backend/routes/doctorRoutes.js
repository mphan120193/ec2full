import express from 'express';
import {getAllDoctors, getDoctorDetailById, saveDoctorInfor, getScheduleListByDoctorIDAndDate,
    getScheduleDetailByDoctorID} from '../controllers/doctorController.js';

import redisClient from '../config/redis.js';




const cacheDoctorDetails = async (req, res, next) => {
            const doctorId = req.query.id || req.params.id; 
        
            
            if (!doctorId) {
              return next(); // Skip cache if no doctorId
            }
            const cacheKey = `doctor_detail:${doctorId}`;
          
            try {
              const cachedData = await redisClient.get(cacheKey);
          
              if (cachedData) {
                console.log(`Cache hit for doctor ID: ${doctorId}`);
                res.setHeader('Content-Type', 'application/json');
                res.send(cachedData);
                return;
              }
          
              // If no cached data, move to the next middleware/route handler
              res.sendResponse = res.send;
              res.send = async (body) => {
                if (res.statusCode >= 200 && res.statusCode < 300 && typeof body === 'string') {
                  //  cache data for 60s 
                  await redisClient.set(cacheKey, body, { EX: 60 });
                  console.log(`Cache set for doctor ID: ${doctorId}`);
                }
                res.sendResponse(body);
              };
          
              next();
            } catch (error) {
              console.error('Error checking/setting doctor details cache:', error);
              next();
            }
};
    
const router = express.Router();

router.get('/get-doctor-list', getAllDoctors);
router.get('/get-doctor-detail-by-id',cacheDoctorDetails, getDoctorDetailById);



router.post('/save-doctor-infor',  saveDoctorInfor);
router.get('/get-schedule-list-by-doctorID-date', getScheduleListByDoctorIDAndDate);
router.get('/get-schedule-detail-by-doctorID', getScheduleDetailByDoctorID);


export default router;