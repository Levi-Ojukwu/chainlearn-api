-- Add unique constraint on quiz_submissions(quiz_id, user_id) to prevent duplicate submissions
CREATE UNIQUE INDEX IF NOT EXISTS idx_quiz_submissions_quiz_user
  ON quiz_submissions (quiz_id, user_id);

-- Add unique constraint on credentials(user_id, course_id) to prevent duplicate credentials
CREATE UNIQUE INDEX IF NOT EXISTS idx_credentials_user_course
  ON credentials (user_id, course_id);
